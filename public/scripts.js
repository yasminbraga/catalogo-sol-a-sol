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
    console.log(event.target)
  }
}