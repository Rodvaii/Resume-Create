function $(id){ return document.getElementById(id); }

function updatePreview(){
  $('c-name').textContent = $('name').value.toUpperCase();
  $('c-title').textContent = $('title').value.toUpperCase();
  $('c-phone').textContent = $('phone').value;
  $('c-email').textContent = $('email').value;
  $('c-address').innerHTML = $('address').value.replace(/\n/g,'<br>');
  $('c-profile').textContent = $('profile').value;
  $('c-work').innerHTML = $('work').value.replace(/\n/g,'<br>');
  $('c-education').textContent = $('education').value;

  const skills = $('skills').value.split(',').map(s => s.trim()).filter(Boolean);
  const langs = $('languages').value.split(',').map(s => s.trim()).filter(Boolean);
  $('c-skills').innerHTML = skills.map(s => `<li>${s}</li>`).join('');
  $('c-langs').innerHTML = langs.map(l => `<li>${l}</li>`).join('');

  $('c-father').textContent = $('father').value;
  $('c-mother').textContent = $('mother').value;
  $('c-passport').textContent = $('passport').value;
  $('c-passportValidity').textContent = $('passportValidity').value;
}

$('photo').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      $('c-photo').src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
});

['name','title','phone','email','address','profile','work','education','skills','languages','father','mother','passport','passportValidity']
.forEach(id => $(id).addEventListener('input', updatePreview));

updatePreview();

$('downloadPdf').addEventListener('click', async ()=>{
  const page = $('a4page');
  const canvas = await html2canvas(page, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p','mm','a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${$('name').value.replace(/\s+/g,'_')}_Resume.pdf`);
});

$('printBtn').addEventListener('click', ()=> window.print());
