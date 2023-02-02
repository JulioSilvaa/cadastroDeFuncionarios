import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebase/firebaseConfig";

function UploadImage() {
  const [imgURL, setImgURL] = useState("");
  const [progressValue, setProgress] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadProcess = uploadBytesResumable(storageRef, file);

    uploadProcess.on(
      "state_changed",
      (snapshot) => {
        const progressValue = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressValue);
      },

      (error) => alert(error),
      () => {
        getDownloadURL(uploadProcess.snapshot.ref).then((url) => {
          setImgURL(url);
        });
      }
    );
  };
  return [handleFileUpload, imgURL, progressValue];
}

export default UploadImage;
