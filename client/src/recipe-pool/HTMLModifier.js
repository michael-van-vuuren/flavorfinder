class HTMLModifier {
    static modifyHTML(htmlString) {
        // working div
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = htmlString

        // remove class='printfooter'
        const printFooterElements = tempDiv.getElementsByClassName('printfooter')
        Array.from(printFooterElements).forEach((element) => {
            element.innerHTML = '<br /><br />'
        })

        // remove class='mw-editsection'
        const editSectionElements = tempDiv.getElementsByClassName('mw-editsection')
        Array.from(editSectionElements).forEach((element) => {
            element.parentNode.removeChild(element)
        })

        // remove the first <p> under class='mw-body-content'
        const mwBodyContentElement = tempDiv.querySelector('.mw-body-content')
        if (mwBodyContentElement) {
            const firstParagraph = mwBodyContentElement.querySelector('p')
            if (firstParagraph) {
                firstParagraph.parentNode.removeChild(firstParagraph)
            }
        }

        // remove links
        const linkElements = tempDiv.getElementsByTagName('a')
        Array.from(linkElements).forEach((link) => {
            const hasImages = link.querySelector('img')
            if (!hasImages) {
                const textNode = document.createTextNode(link.textContent)
                link.parentNode.replaceChild(textNode, link)
            } else {
                link.style.pointerEvents = 'none' // no click on img
            }
        })

        // class='infobox'
        const infoboxElements = tempDiv.getElementsByClassName('infobox')
        Array.from(infoboxElements).forEach((infobox) => {
            infobox.style.borderRadius = '10px'
            infobox.style.overflow = 'hidden'
            infobox.style.border = '1px solid #ccc'
            infobox.style.marginBottom = '20px'
            infobox.style.width = '100%'

            // infobox title
            const firstTh = infobox.querySelector('th')
            if (firstTh) {
                firstTh.style.backgroundColor = '#a9d97f'
                firstTh.style.borderRadius = '5px'
                firstTh.style.padding = '10px'
                firstTh.style.color = 'white'
            }
        })

        // add margin-top to <h2> and <h3> elements under class='mw-body-content'
        const mwBodyContentHeadings = tempDiv.querySelectorAll('.mw-body-content h2, .mw-body-content h3')
        Array.from(mwBodyContentHeadings).forEach((heading) => {
            heading.style.marginTop = '10px' // Adjust as needed
        })

        return tempDiv.innerHTML
    }
}

export default HTMLModifier