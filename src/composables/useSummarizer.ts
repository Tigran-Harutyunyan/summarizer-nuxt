import axios from 'axios';

export async function useSummarizer(url: string) {
    const options = {
        method: 'GET',
        url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
        params: {
            url,
            length: '3'
        },
        headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPID_ARTICLE_KEY,
            'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }

}