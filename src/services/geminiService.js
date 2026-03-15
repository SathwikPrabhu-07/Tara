const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  console.error('Gemini API key is missing. Check .env file.')
}

/**
 * Language display names used in the Gemini prompt.
 */
const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi',
  te: 'Telugu',
}

/**
 * Translate existing lesson text into the target language via Gemini.
 *
 * Returns the translated text on success, or null on any failure.
 *
 * @param {string} text     – the preset English lesson text to translate
 * @param {string} language – ISO language code (en | hi | te)
 * @returns {Promise<string|null>}
 */
export async function translateLesson(text, language = 'en') {
  if (!apiKey) {
    console.error('Gemini API key is not configured')
    return null
  }

  const langName = LANGUAGE_NAMES[language] || 'English'

  try {


    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Translate the following lesson explanation into ${langName}.\nKeep the meaning simple and clear.\n\nText:\n${text}`,
                },
              ],
            },
          ],
        }),
      }
    )

    if (!res.ok) {
      throw new Error(`Gemini request failed with status ${res.status}`)
    }

    const data = await res.json()

    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null
  } catch (err) {
    console.error('Gemini error:', err)
    return null
  }
}
