export const getFileExtension = (selectedFile) => {
  if (selectedFile) {
    const fileName = selectedFile.name;
    const extension = fileName.split('.').pop().toUpperCase();
    return extension;
  }
  return null;
}

export const formatFileSize = (sizeInBytes) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let fileSize = sizeInBytes;

  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024;
    unitIndex++;
  }

  return `${fileSize.toFixed(2)} ${units[unitIndex]}`;
}

export const getFullName = (userData) => {
  if (userData) {
    return userData?.surname ? `${userData.name} ${userData.surname}` : userData.name;
  }
  else {
    return null
  }
}

export const generateApiKey = () => {
  const length = 32; // Define the length of the API key
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Characters to use
  let apiKey = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    apiKey += charset[randomIndex];
  }

  return apiKey;
};