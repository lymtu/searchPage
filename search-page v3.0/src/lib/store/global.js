import { reactive } from 'vue'

import backgroundJpgSrc from '/background.jpg?url'

export const globalStore = reactive({
    backgroundImgSrc: backgroundJpgSrc,
    isAssociationAllowed: true,
})