const themeDark = {
    bgbase: "bg-[#121212]",
    textheader: "text-gray-50",
    text: "text-gray-100",
    bgblock: "bg-gray-700",
    bgbutton: "bg-gray-100",
    button: ['bg-emerald-500', 'text-white'],
    lable: ['bg-rose-500', 'text-white'],
    input: ['bg-gray-600', 'text-white'],
    nav: ['bg-gray-700', 'text-white'],
    profilebutton: ['bg-gray-800','bg-opacity-50', 'text-gray-300'],
    itemlist: ['bg-gray-800','bg-opacity-50', 'text-gray-300'],
    activebutton: ['bg-puple-800','bg-opacity-50', 'text-white'],
    primarybutton: ['bg-rose-500','bg-opacity-50', 'text-white']
  }
  
  const themeNight = {
    bgbase: "bg-gray-700",
    textheader: "text-gray-50",
    text: "text-gray-100",
    bgblock: "bg-gray-800",
    bgbutton: "bg-gray-100",
    button: ['bg-emerald-500', 'text-white'],
    lable: ['bg-rose-500', 'text-white'],
    input: ['bg-gray-500', 'text-white'],
    nav: ['bg-gray-800', 'text-white'],
    profilebutton: ['bg-gray-900','bg-opacity-40', 'text-gray-300'],
    itemlist: ['bg-gray-900','bg-opacity-40', 'text-gray-300'],
    activebutton: ['bg-rose-800','bg-opacity-50', 'text-white'],
    primarybutton: ['bg-rose-500','bg-opacity-50', 'text-white']
  }
  
  const themeSepia = {
    bgbase: "bg-[#B69A52]",
    textheader: "text-gray-50",
    text: "text-gray-50",
    bgblock: "bg-[#563F03]",
    bgbutton: "bg-gray-100",
    button: ['bg-[#D4C398]', 'text-gray-800'],
    lable: ['bg-emerald-600', 'text-white'],
    input: ['bg-emerald-300', 'text-black'],
    nav: ['bg-[#563F03]', 'text-white'],
    profilebutton: ['bg-[#563F03]','bg-opacity-70', 'text-white'],
    itemlist: ['bg-[#563F03]','bg-opacity-70', 'text-white'],
    activebutton: ['bg-rose-500','bg-opacity-50', 'text-white'],
    primarybutton: ['bg-rose-500','bg-opacity-50', 'text-white']
  }
  
  const themeBright = {
    bgbase: "bg-white",
    textheader: "text-gray-900",
    text: "text-black",
    bgblock: "bg-gray-500",
    bgbutton: "bg-gray-100",
    button: ['bg-emerald-600', 'text-white'],
    lable: ['bg-rose-500', 'text-white'],
    input: ['bg-gray-300', 'text-black'],
    nav: ['bg-gray-700', 'text-white'],
    profilebutton: ['bg-gray-700','bg-opacity-70', 'text-white'],
    itemlist: ['bg-gray-700','bg-opacity-30', 'text-black'],
    activebutton: ['bg-rose-500','bg-opacity-50', 'text-white'],
    primarybutton: ['bg-gray-700', 'text-white']
  }
let theme = themeDark
const themeUpdate = (e) => {
    if(e == 'dark') theme=themeDark
    if(e == 'bright') theme=themeBright
    if(e == 'sepia') theme=themeSepia
    if(e == 'night') theme=themeNight
    return theme
}

const getTheme = (t) => {
    return theme
}

export {themeUpdate, getTheme}