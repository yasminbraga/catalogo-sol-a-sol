const Mask = {
  apply(input, func) {
    setTimeout(function() {
      input.value = Mask[func](input.value)
    }, 1)
  },
  formatBRL(value) {
    value = value.replace(/\D/g, "")

    return value = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value/100)
  }
}


const ImageUpload = {
  input: "",
  uploadLimit: 1,
  preview: document.querySelector("#image-preview"),
  files: [],
  handleFileInput(event) {
    const {files: fileProduct} = event.target
    ImageUpload.input = event.target

    if (ImageUpload.hasLimit(event)) return

    Array.from(fileProduct).forEach(file => {
      ImageUpload.files.push(file)

      const reader = new FileReader()

      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)

        const div = ImageUpload.getContainer(image)

        ImageUpload.preview.appendChild(div)

      }
      reader.readAsDataURL(file)
    })

    ImageUpload.input.files = ImageUpload.getAllFiles()
  },
  hasLimit(event) {
    const {uploadLimit, input, preview} = ImageUpload
    const {files: fileList} = input

    if (fileList.length > uploadLimit) {
      alert('Apenas 1 arquivo por produto')
      event.preventDefault()
      return true
    }

    const photoDiv = []
    preview.childNodes.forEach(item => {
      if (item.classList && item.classList.value == 'image')
      photoDiv.push(item)
    })

    const totalPhotos = fileList.length + photoDiv.length
    if (totalPhotos > uploadLimit) {
      alert('apenas 1 foto')
      event.preventDefault()
      return true
    }

    return false
  },
  getAllFiles() {
    const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

    ImageUpload.files.forEach(file => dataTransfer.items.add(file))

    return dataTransfer.files
  },
  getContainer(image) {
    const div = document.createElement('div')
    div.classList.add('photo')

    div.onclick = ImageUpload.removeFile
    div.appendChild(image)

    div.appendChild(ImageUpload.getRemoveButton())

    return div
  },
  getRemoveButton() {
    const button = document.createElement('i')
    button.classList.add('material-icons')
    button.innerHTML = 'close'
    return button
  },
  removeFile(event) {
    const photoDiv = event.target.parentNode 
    
    const photosArray = Array.from(ImageUpload.preview.children)
    const index = photosArray.indexOf(photoDiv)
    
    ImageUpload.files.splice(index, 1)
    ImageUpload.input.files = ImageUpload.getAllFiles()

    photoDiv.remove()
  },
  removeOldFile(event) {
    const photosDiv = event.target.parentNode //div class=photo
    console.log(photosDiv) 
    if (photosDiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"]')
      if (removedFiles) {
        removedFiles.value += `${photosDiv.id},`
      }
    }
    photosDiv.remove()
  }
}