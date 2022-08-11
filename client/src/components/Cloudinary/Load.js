import {Image} from "cloudinary-react"
const Load = ({publicId}) => {
    <Image 
        cloudName = "doc7plec9"
        publicId = {publicId}
        width = "300"
        crop = "scale"
    />
}

export default Load