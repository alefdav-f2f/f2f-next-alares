import React from "react";

export default function Modal({ buttonText, title, text }: any) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      {buttonText ? (
        <button
          className="underline font-bold"
          type="button"
          onClick={() => setShowModal(true)}
        >
          {buttonText}
        </button>
      ) : null}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl max-h-screen">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  {title ? (
                    <h3 className="text-3xl font-semibold">{title}</h3>
                  ) : null}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto overflow-y-auto max-h-[calc(100vh-200px)]">
                  {text ? (<div className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: text }}></div>) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>) : null}
    </>
  );
}
