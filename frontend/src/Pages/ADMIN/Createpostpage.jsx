import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Createpostpage() {
  const [images, setImages] = useState([]);
  const [blogUploadProgress, setBlogUploadProgress] = useState(0); // State to track upload progress
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const UploadBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    images.forEach((image) => {
      formData.append("files", image);
    });

    try {
      const response = await axios.post("/api/v2/admin/post-a-blog", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setBlogUploadProgress(progress); // Update progress state
        },
      });
      alert("success");
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setBlogUploadProgress(0); // Reset progress after upload completes
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const allImages = Array.from(e.target.files);
    setImages(allImages);
  };

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen md:w-[60vw] w-full mx-auto">
        <h1 className="text-center text-[20px] p-3 md:text-[24px] font-semibold">
          Create Post
        </h1>
        <form
          onSubmit={UploadBlog}
          aria-required
          action=""
          className="flex w-11/12 mx-auto my-4 flex-col gap-2"
        >
          <div className="md:grid md:grid-cols-[2fr_1fr] flex flex-col gap-4">
            <TextInput
              placeholder="write a unique title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
            />
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value={"uncategorized"}>Select Category</option>
              <option value={"JavaScript"}>JavaScript</option>
              <option value={"React js"}>React js</option>
              <option value={"Next js"}>Next js</option>
            </Select>
          </div>
          <div className="p-3  border-teal-500 flex border-dotted justify-between items-center border-[4px] ">
            <FileInput multiple onChange={handleFileChange} accept="image/*" />
            <Button type="button" gradientDuoTone={"purpleToBlue"} size={"sm"}>
              Upload image
            </Button>
          </div>
          <ReactQuill
            required
            value={description}
            onChange={(value) => setDescription(value)}
            theme="snow"
            placeholder="write something..."
            className="min-h-80 mb-12 rounded-md h-80"
          />
          <Button type="submit" gradientDuoTone={"purpleToPink"}>
            {blogUploadProgress > 0 ? ( // Display progress bar if upload progress is greater than 0
              <div className="w-12 h-12">
                <CircularProgressbar
                  value={blogUploadProgress}
                  text={`${blogUploadProgress}%`}
                />
              </div>
            ) : (
              <span>Publish</span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
