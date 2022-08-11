import { useState } from "react";

const Upload = () => {
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState("");
    const [previewSource, setPreviewSource] = useState();
  const handleFileInputChange = (ev) => {
    //just get first file thaty selected if we have multifile
    const file = ev.target.files[0]; 
    //this fuction use for show img on img tag
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
        setPreviewSource(reader.result);
    }
  }
  const handleSubmitFile = (ev) => {
    ev.preventDefault();
    if(!previewSource) return;
    uploadImage(previewSource);
}
const uploadImage = async (base64EncodedImage) => {
    try {
        fetch("/api/uploadimg",{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({data:base64EncodedImage})
        })
    } catch (err) {
        console.error(err)
    }

}
  return (
    <div >
      <form onSubmit={handleSubmitFile}>
        <input type="file" name="img" onChange={handleFileInputChange} />
        <input type="submit" value="submit" />
      </form>
      {previewSource && <img src={previewSource} style={{height:"300px", width:"300px", borderRadius:"50%"}}/>}
    </div>
  );
};

export default Upload;
