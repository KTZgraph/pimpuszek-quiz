// https://youtu.be/HMXY4FfyGD4?t=1825

import { useEffect, useState } from "react";
import supabase from "../../services/supabase/connector";
import Icon from "../../public/assets/Face.png";
import camera from "../../public/assets/camera on.png";

const SUPABASE_BUCKET_AVATARS = "avatars";

const Avatar = ({ url, size, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const uploadAvatar = async (e) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("Musisz wybrać jakieś zdjęcie do uploadu");
      }

      const file = evet.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error, uploadError } = await supabase.storage
        .from(SUPABASE_BUCKET_AVATARS)
        .upload(filePath, fileName);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {}
  };

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET_AVATARS)
        .download(path);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.error(error);
    }
  };

  return <div></div>;
};

export default Avatar;
