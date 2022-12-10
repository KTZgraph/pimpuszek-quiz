"use client";
// https://youtu.be/HMXY4FfyGD4?t=1098
import supabase from "../../services/supabase/connector";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";

const SUPABASE_USER_TABLE = "profiles";
const SUPABASE_USER_TABLE_COLUMNS = [
  "username",
  "website",
  "avatar_url",
  "NOTION_TOKEN",
];

import FormInput from "../atoms/FormInput";

const ProfileForm = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    avatarUrl: "",
    username: "",
    notionToken: "",
    website: "",
  });

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      // https://supabase.com/docs/reference/javascript/v1/auth-signup
      // https://youtu.be/HMXY4FfyGD4?t=1282
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from(SUPABASE_USER_TABLE)
        .select(SUPABASE_USER_TABLE_COLUMNS.join(","))
        .eq("id", user.id)
        .single();

      if (data) {
        setData({
          avatarUrl: data.avatar_url,
          username: data.username,
          notionToken: data.NOTION_TOKEN,
          website: data.website,
        });
      }
    } catch (error) {
      alert(error.message);
      console.error(error);
    } finally {
      loading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    console.log(" --------------- updateProfile --------------- ");

    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id: user.id,
        username: data.username,
        website: data.website,
        NOTION_TOKEN: data.notionToken,
        avatar_url: data.avatarUrl,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from(SUPABASE_USER_TABLE)
        // https://youtu.be/HMXY4FfyGD4?t=1684
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert.apply(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    // WARNING e.target.name to name z "name" z inputa
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h2>Dane zalogowanefgo użytkownika - można zaktulizować swoje dane</h2>
      <form onSubmit={updateProfile}>
        <Avatar
          url={data.avatarUrl}
          size={150}
          onUpload={(url) => {
            setData((prevState) => ({ ...prevState, avatarUrl: url }));
            updateProfile({ username, website, avatar_url: url });
          }}
        />

        <FormInput
          label="avatar adres url"
          name="avatarUrl"
          type="text"
          value={data.avatarUrl}
          onChange={handleChange}
        />

        {/* -------------------------- */}
        <FormInput
          label="username"
          name="username"
          type="text"
          value={data.username}
          onChange={handleChange}
        />
        <FormInput
          label="Token do swojego notion"
          name="notionToken"
          type="text"
          value={data.notionToken}
          onChange={handleChange}
        />
        <FormInput
          label="website Url"
          name="website"
          type="text"
          value={data.website}
          onChange={handleChange}
        />

        <button type="submit">Zaktualizuj dane</button>
      </form>
      <button onClick={async () => await supabase.auth.signOut()}>
        Wyloguj się
      </button>
    </div>
  );
};

export default ProfileForm;
