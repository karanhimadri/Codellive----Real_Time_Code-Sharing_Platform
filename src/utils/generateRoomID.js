const generateRoomId = () => {
  const characters = "0123456789";
  let roomID = Array.from({ length: 6 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");

  return roomID
}

export default generateRoomId


