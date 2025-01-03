import React, { useState, useRef, ChangeEvent, useEffect, useCallback } from "react";
import { ImageUploadIcon } from "./ImageUploadIcon";
import ImageUpload from "@/lib/imageUpload";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";

interface CustomSingleFileInputProps {
  onChange: (file: File | string | null) => void;
  initialValue?: string;
  // reset?: boolean;
}

const CustomSingleFileImage: React.FC<CustomSingleFileInputProps> = ({
  onChange,
  initialValue,
  // reset
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValue || null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(null);
  },[]);
  
  useEffect(() => {
    if (initialValue) {
      setPreviewUrl(initialValue);
    }
  }, [initialValue]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = useCallback(async (file: File) => {
    setLoading(true);
    try {
      const imgUrl = await ImageUpload(file);
      if (!imgUrl) {
        throw new Error("Image upload failed");
      }
      setPreviewUrl(imgUrl);
      onChange(imgUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed");
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  const handleClearFile = () => {
    setPreviewUrl(null);
    onChange(null);
  };

  return (
    <div
      className={`lg:h-80 border-dashed border-2 p-8 rounded-lg text-center ${
        isDragging ? `bg-blue-100 border-blue-500` : "bg-gray-100 border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button" 
      aria-label="Drag and drop an image here, or click to upload" 
    >
      {previewUrl ? (
        <div className="mt-4 lg:mt-0 relative">
          <div className="bg-white p-2 h-52 rounded-lg shadow-lg mb-2">
          
           <Image
                src={previewUrl}
                alt="Uploaded thumbnail"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-contain rounded"
                priority={false}
                quality={75}
              />
            <p className="truncate text-xs mt-3">Uploaded thumbnail</p>
          </div>
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 rounded-lg">
              <ClipLoader color="#000000" />
            </div>
          )}
          <button
            className="mt-4 bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFile}
            type="button"
          >
            Clear File
          </button>
        </div>
      ) : (
        <div className="lg:mt-16">
          <div className="flex justify-center">
            <ImageUploadIcon />
          </div>
          <p className="text-sm text-gray-400 my-2">
            Drag and drop an image here, or click to upload
          </p>
          <button
            type="button"
            className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Upload Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <p className="text-xs leading-5 p-1 text-gray-400">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomSingleFileImage;
