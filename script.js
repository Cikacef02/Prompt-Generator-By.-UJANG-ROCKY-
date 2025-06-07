document.addEventListener('DOMContentLoaded', () => {
    // Referensi ke elemen-elemen di HTML
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const promptResult = document.getElementById('promptResult');

    const subjectInput = document.getElementById('subject');
    const detailsInput = document.getElementById('details');
    const backgroundInput = document.getElementById('background');
    const styleSelect = document.getElementById('style');
    const lightingSelect = document.getElementById('lighting');
    const angleSelect = document.getElementById('angle');
    const paramsInput = document.getElementById('params');

    // Fungsi untuk membuat prompt
    const generatePrompt = () => {
        const subject = subjectInput.value.trim();
        
        // Validasi: Pastikan subjek diisi
        if (!subject) {
            promptResult.textContent = '⛔ Error: "Subjek / Objek Utama" wajib diisi untuk membuat prompt.';
            promptResult.style.color = '#ffcdd2'; // Warna merah muda untuk error
            return;
        }
        
        promptResult.style.color = '#e2e8f0'; // Kembalikan warna teks normal

        const promptParts = [
            `${subject}, ${detailsInput.value.trim()}`, // Gabung subjek dan detail
            backgroundInput.value.trim(),
            styleSelect.value,
            lightingSelect.value,
            angleSelect.value,
            // Kata kunci kualitas untuk hasil yang lebih baik
            'hyper-detailed, cinematic composition, masterpiece, 8k, high quality'
        ];

        // Gabungkan semua bagian yang tidak kosong dengan koma
        let finalPrompt = promptParts.filter(part => part).join(', ');

        // Tambahkan parameter teknis di akhir jika ada
        const params = paramsInput.value.trim();
        if (params) {
            finalPrompt += ` ${params}`;
        }
        
        promptResult.textContent = finalPrompt;
    };

    // Fungsi untuk menyalin prompt
    const copyPrompt = () => {
        const textToCopy = promptResult.textContent;
        // Jangan salin jika isinya pesan error atau pesan awal
        if (textToCopy && !textToCopy.startsWith('⛔') && !textToCopy.startsWith('Hasil prompt')) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Beri feedback visual ke pengguna
                copyBtn.textContent = '✅ Tersalin!';
                copyBtn.style.backgroundColor = '#28a745'; // Warna hijau sukses
                
                setTimeout(() => {
                    copyBtn.textContent = 'Salin Prompt';
                    copyBtn.style.backgroundColor = '#343a40';
                    copyBtn.style.border = '1px solid #6c757d';
                }, 2000);

            }).catch(err => {
                console.error('Gagal menyalin teks: ', err);
                alert('Oops, gagal menyalin prompt.');
            });
        }
    };

    // Tambahkan event listener ke tombol
    generateBtn.addEventListener('click', generatePrompt);
    copyBtn.addEventListener('click', copyPrompt);
});