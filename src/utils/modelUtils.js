const generateRandomCoords = () => {
    const row = Math.floor(Math.random() * 10);
    const column = Math.floor(Math.random() * 10);
    return [row, column];
};

export default generateRandomCoords;
