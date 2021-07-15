module.exports = {
    init: () => {
        const dragAndDrop = document.getElementById('drag-and-drop');
        dragAndDrop.ondragover = () => {
            return false;
        };

        dragAndDrop.ondragleave = () => {
            return false;
        };

        dragAndDrop.ondragend = () => {
            return false;
        };

        dragAndDrop.ondrop = (e) => {
            e.preventDefault();
            const paths = [];

            for (let file of e.dataTransfer.files) {
                paths.push(file.path);
            }

            // create html from file paths
            const fileItems = paths.reduce((html, file) => {
              html += `<li class="file-item">${file}</li>`;
              return html;
            }, '');
          
            // put File paths items into fileList element
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = fileItems;
            return false;
        };
    },
};