import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function Createpostpage() {
  return (
    <div className="min-h-screen w-11/12 mx-auto">
      <h1 className="text-center text-[20px] p-3 md:text-[24px] font-semibold">
        Create Post
      </h1>
      <form action="" className="flex w-11/12 mx-auto my-4 flex-col gap-2">
        <div className="md:grid md:grid-cols-[2fr_1fr] flex flex-col gap-4">
          <TextInput type="text" required />
          <Select required>
            <option value={"uncategorized"}>Select Category</option>
            <option value={"JavaScript"}>JavaScript</option>
            <option value={"React js"}>React js</option>
            <option value={"Next js"}>Next js</option>
          </Select>
        </div>
        <div className="p-3  border-teal-500 flex border-dotted justify-between items-center border-[4px] ">
          <FileInput accept="image/*" />
          <Button type="button" gradientDuoTone={"purpleToBlue"} size={"sm"}>
            Upload image
          </Button>
        </div>
        <ReactQuill
          required
          theme="snow"
          placeholder="write something..."
          className="h-72 mb-12"
        />
        <Button type="submit" gradientDuoTone={"purpleToPink"}>
          Publish
        </Button>
      </form>
    </div>
  );
}
