import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';

const SavePdf = async (dataBase64, fileName ) => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
      return;
    }

    try {
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, dataBase64, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        throw new Error(e);
      }
}

export default SavePdf;