"use client";

import { useCompletion } from "ai/react";
import React from "react";

const Input = () => {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
    error,
  } = useCompletion({
    api: "/api/completion",
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-4 justify-center w-11/12 mx-auto md:w-1/2"
    >
      <div className="relative w-full">
        <textarea
          rows={4}
          value={input}
          onChange={handleInputChange}
          className="w-full title1 border-2 border-gray-500 bg-transparent px-4 py-2 rounded-lg text-sm focus:border-gray-300 focus:outline-none transition duration-150 ease-in-out resize-none"
          style={{ border: input.length > 100 ? "2px solid #bc5652" : "" }}
          placeholder="Write your subject for the email..."
          autoFocus={true}
        />
        <div
          style={{ color: input.length > 100 ? "#bc5652" : "" }}
          className="absolute bottom-3 right-2 text-gray-400 text-xs"
        >
          <span>{input.length}</span>/100
        </div>
      </div>
      <button
        disabled={input.length === 0 || input.length > 100}
        type="submit"
        className="myButton text-white font-bold py-2 px-4 rounded disabled:bg-red-400 disabled:scale-100 disabled:cursor-not-allowed"
      >
        Generate
      </button>

      {/* Output */}
      {completion ? (
        <div className="relative w-full rounded-lg myBg p-4">
          <p style={{ whiteSpace: "pre-line" }} className="title1 text-sm">
            {completion}
          </p>
        </div>
      ) : isLoading ? (
        <div className="relative w-full rounded-lg myBg p-4">
          <p className="title1 text-sm">Loading...</p>
        </div>
      ) : error ? (
        <div className="relative w-full rounded-lg myBg p-4">
          <p className="title1 text-sm">{error.message}</p>
        </div>
      ) : null}
    </form>
  );
};

export default Input;
