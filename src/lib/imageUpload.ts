import axios from 'axios';

const ImageUpdload = async (image:File) => {
    process.env.NEXT_PUBLIC_URL
    const preset_key = process.env.NEXT_PUBLIC_PRESET_KEY;
    const cloud_name = process.env.NEXT_PUBLIC_CLD_USER_NAME;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', preset_key!);

    try {
        console.log(image.name);
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
        const { format, secure_url } = res.data;
        console.log("🚀 ~ ImageUpdload ~ format:", format)
        console.log(secure_url,',............................from cloudinary..');
        if (['png', 'jpeg', 'jpg','webp'].includes(format)) {
            return secure_url
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export default ImageUpdload;

