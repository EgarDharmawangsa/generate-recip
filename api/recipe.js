export default async function handler(req, res) {
  try {
    const { ingredients, difficulty, time } = req.query;

    const message = `
Kamu adalah asisten chef. 
Tugasmu adalah membuat resep masakan berdasarkan input berikut:

- Bahan-Bahan: ${ingredients}
- Tingkat Kesulitan: ${difficulty}
- Durasi: ${time} menit

Utamakan resep masakan Indonesia.

Aturan penting:
1. Periksa bahan yang diberikan. Jika ada bahan yang bukan termasuk bahan masakan (contoh: kayu, plastik, batu, kertas, dan sejenisnya), maka jangan buat resep. 
   Balas dengan format: "❌ [nama bahan] bukan termasuk bahan masakan."
2. Jika semua bahan valid, buat resep sesuai bahan (tidak ada bahan tambahan selain bahan yang diberikan), tingkat kesulitan, dan durasi.
3. Untuk output jangan berisi kalimat pembuka atau penutup, melainkan gunakan format berikut:
   Nama Hidangan:
   Bahan-Bahan:
   Langkah-Langkah:
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    const ai_recipe = data.choices?.[0]?.message?.content || "❌ Gagal membuat resep";

    res.status(200).json({ recipe: ai_recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan." });
  }
}
