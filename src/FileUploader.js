import AWS from 'aws-sdk';
import { useState } from 'react';

AWS.config.update({
  accessKeyId: '<ACCESS-KEY-ID>',
  secretAccessKey: '<SECRET-ACCESS-KEY>',
  region: 'us-east-1',
  signatureVersion: 'v4',
});

export default function ImageUploader() {
    const s3 = new AWS.S3();
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);
  
    const handleFileSelect = (e) => {
      setFile(e.target.files[0]);
    }
  
    const uploadToS3 = async () => {
        if (!file) {
          return;
        }
        const params = { 
          Bucket: 'test-bucket-hymns', 
          Key: `${Date.now()}.${file.name}`, 
          Body: file 
        };
        const { Location } = await s3.upload(params).promise();
        setImageUrl(Location);
        console.log('uploading to s3', Location);
    }
  
    return (
      <div >
        <h1>Test File Upload</h1>
        <input type="file" onChange={handleFileSelect} />
        {file && (
          <div style={{ marginTop: '10px' }}>
            <button onClick={uploadToS3}>Upload</button>
          </div>
        )}
        {imageUrl && (
          <div style={{ marginTop: '10px' }}>
            <img src={imageUrl} alt="uploaded" />
          </div>
        )}
      </div>
    );
}