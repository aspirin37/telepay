import autolinker from 'autolinker';
let cache = {}
export default (text, placeholder = '') => {
    if (!cache.text || !cache.linked || text !== cache.text) {
        if (!text || text.length === 0) return placeholder;
        let linkedText = autolinker.link(text, {
            mention: 'instagram',
            replaceFn: match => {
                if (match && match.getType() === 'mention') {
                    let m = match.matchedText.slice(1)
                    return `<a href="https://t.me/${m}" target="blank" rel="noreferrer nofollow noopener">${match.matchedText}</a>`
                }
                if (match && match.getType() === 'url') {
                    if (match.urlMatchType === 'scheme') {
                        if (match.url.length + match.offset === text.length) {
                            return `<a href="${match.url}" class="forward forward-link" target="blank" rel="noreferrer nofollow noopener">${match.url}</a>`
                        } else {
                            return `<a href="${match.url}" target="blank" rel="noreferrer nofollow noopener">${match.url}</a>`
                        }
                    } else if (match.urlMatchType === 'tld') {
                        return `<a href="https://${match.url}" target="blank" rel="noreferrer nofollow noopener">${match.url}</a>`
                    }
                }
            }
        });
        cache.text = text;
        cache.linked = linkedText;
        return linkedText;
    } else {
        return cache.linked
    }
}