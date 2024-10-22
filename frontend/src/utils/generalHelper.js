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