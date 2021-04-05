import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';


cloudinary.config({ 
  cloud_name: 'doilfq77p', 
  api_key: '495148786141616', 
  api_secret: 'TOYYMatmYFppUTo-zir6tY4kkEk' 
});

describe('Tests in fileUpload helper', () => {

  test('It should load a file and return URL', async () => {
    const response = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
    const blob = await response.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    // Delete image by ID
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');

    await cloudinary.v2.api.delete_resources(imageId);
  });

  test('It should return an error', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });

});
