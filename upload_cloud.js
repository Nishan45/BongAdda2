
const apiUrl = 'https://api.cloudinary.com/v1_1/dzwpvhtx5/image/upload';
const upload_preset='jiyvlhem';


export default upload_cloud=async (result)=>{
    const name=result.assets[0].uri.split('/').pop();
    const type=name.split('.').pop();
    
    let url="invalid";
    let base64Img = `data:image/${type};base64,${result.assets[0].base64}`
    let data = {
      "file": base64Img,
      "upload_preset": upload_preset,
    }
    url= await fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
        let data = await r.json()
        return data.secure_url;
    }).catch(err=>console.log(err))

    return url;
    
}