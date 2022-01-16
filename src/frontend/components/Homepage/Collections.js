import React from "react";

const Collections = ({ data }) => {
  const { isShowTitle, collections, name } = data;

  return (
    <div className="my-12">
      {isShowTitle && (
        <h1 className="font-bold text-2xl px-3 text-center">{name}</h1>
      )}
      <div className="flex justify-center mt-5">
        {collections?.map((d, i) => {
          return (
            <div key={i}>
              <input type="radio" id={d.id} name="collections"  value={d.id} checked={i===0}/>
              <label className="font-mono mx-3 h-underline active" for={d.id}>
                {d.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
