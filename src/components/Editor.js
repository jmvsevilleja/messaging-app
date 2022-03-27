import React from 'react'
import ReactQuill, {Quill} from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import {uploadFile} from "../api/api";

var quillObj;
Quill.register('modules/imageResize', ImageResize);

const imageHandler = async () => {
    //console.log('imageHandler');
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
        var file = input.files[0];
        var formData = new FormData();
        formData.append('image', file);
        const range = quillObj.getEditorSelection();
        uploadFile(file).then((uploaded) => {
            quillObj.getEditor().insertEmbed(range.index, 'image', uploaded.path);
        });
    };
}

export default function Editor({userMessage, onChange}) {
    return (
        <>
            <ReactQuill
                ref={(el) => {
                    quillObj = el;
                }}
                modules={{
                    imageResize: {
                        parchment: Quill.import('parchment'),
                        modules: ['Resize', 'DisplaySize']
                    },
                    toolbar: {
                        container: [
                            [{'header': [1, 2, false]}],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                            ['link', 'image', 'video'],
                            [{'color': []}]
                        ],
                        handlers: {
                            image: imageHandler
                        }
                    }
                }}
                theme="snow" value={userMessage} onChange={onChange} />
        </>
    )
}
