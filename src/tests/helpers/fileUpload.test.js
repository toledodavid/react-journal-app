import { fileUpload } from "../../helpers/fileUpload";


describe('Tests in fileUpload helper', () => {

  test('It should load a file and return URL', async () => {
    const response = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
    const blob = await response.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');
  });

  test('It should return an error', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });

});
