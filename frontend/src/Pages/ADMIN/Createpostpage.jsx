import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";

export default function Createpostpage() {
  const [images, setImages] = useState([]);
  const [blogUploadProgress, setBlogUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  const UploadBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("files", image); // Use "image" as field name for consistency with server-side code
      });
    }

    if (id) {
      try {
        await axios.put(
          "/api/v2/admin/update-post/" + id,
          {
            title,
            category,
            description,
            images,
          },
          {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setBlogUploadProgress(progress);
            },
          }
        );
        alert("Success");
      } catch (error) {
        alert(error.response.data.message);
      } finally {
        setBlogUploadProgress(0);
      }
    } else {
      try {
        const response = await axios.post(
          "/api/v2/admin/post-a-blog",
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setBlogUploadProgress(progress);
            },
          }
        );
        alert("Success");
      } catch (error) {
        alert(error.response.data.message);
      } finally {
        setBlogUploadProgress(0);
      }
    }
  };

  useEffect(() => {
    if (!id) return;
    axios.get("/api/v2/admin/getposts?postId=" + id).then((response) => {
      setTitle(response.data.posts[0].title);
      setCategory(response.data.posts[0].category);
      setDescription(response.data.posts[0].description);
      setImages(response.data.posts[0].images);
    });
  }, [id]);

  const handleFileChange = (e) => {
    if (id) {
      const formData = new FormData();
      const myImages = Array.from(e.target.files);
      myImages.forEach((image) => formData.append("image", image)); // Updated field name to "image"
      axios.post("/api/v2/admin/upload-image", formData).then(({ data }) => {
        setImages((prev) => [...prev, ...data]);
      });
    } else {
      const allImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...allImages]);
    }
  };
  console.log("Images loaded", images);
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
          {images && images.length > 0 && (
            <div className="grid grid-cols-3">
              {images.map((d, i) => (
                <img
                  key={i}
                  className="h-[150px] w-[150px] object-cover"
                  src={
                    id ? "http://localhost:3000/" + d : URL.createObjectURL(d)
                  }
                  alt={`image-${i}`}
                />
              ))}
            </div>
          )}
          <ReactQuill
            required
            value={description}
            onChange={(value) => setDescription(value)}
            theme="snow"
            placeholder="write something..."
            className="min-h-80 mb-12 rounded-md h-80"
          />
          <Button type="submit" gradientDuoTone={"purpleToPink"}>
            {blogUploadProgress > 0 ? (
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
