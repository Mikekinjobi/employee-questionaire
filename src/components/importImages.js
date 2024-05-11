const importImages = () => {
    const imagePaths = [];
  
    for (let i = 1; i <= 25; i++) {
      const imageAPath = `/src/images/QuestionImages/A${i}.png`;
      const imageBPath = `/src/images/QuestionImages/B${i}.png`;
      const imageA = import.meta.globEager(imageAPath);
      const imageB = import.meta.globEager(imageBPath);
      imagePaths.push(imageA[imageAPath].default);
      imagePaths.push(imageB[imageBPath].default);
    }
  
    return imagePaths;
  };
  
  const imagePaths = importImages();
  
  export default imagePaths;
  