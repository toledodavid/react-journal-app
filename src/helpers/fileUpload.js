

export const fileUpload = async (file) => {
  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/doilfq77p/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);

  try {
    const response = await fetch(cloudinaryUrl, {method: 'POST', body: formData});

    if (response.ok) {
      const cloudinaryResponse = await response.json();
      return cloudinaryResponse.secure_url;
    } else {
      throw await response.json();
    }

  } catch (error) {
    throw error;
  }
}