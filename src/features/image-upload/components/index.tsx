import { useState } from 'react';
import { Button, ButtonGroup, Grid, Header } from 'semantic-ui-react';
import useUrlRevoke from '../hooks/useUrlRevoke';

import UploadWidgetDropzone from './UploadWidgetDropzone.component';
import UploadWidgetCropper from './upload-widget-cropper';

interface Props {
  loading: boolean;
  uploadImage: (file: Blob) => void;
}

function ImageUploadWidget({ uploadImage, loading }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [cropper, setCropper] = useState<Cropper>();

  useUrlRevoke(files);

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadImage(blob!));
    }
  };

  return (
    <Grid style={{ marginLeft: '.25rem', textAlign: 'center' }}>
      <Grid.Column width={4}>
        <Header as="h4" color="teal" content="Step 1 - Add photo" />
        <UploadWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={5}>
        <Header as="h4" color="teal" content="Step 2 - Resize image" />
        {files && files.length !== 0 && (
          <UploadWidgetCropper setCropper={setCropper} imagePreview={(files[0] as any).preview} />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={5}>
        <Header as="h4" color="teal" content="Step 3 - Preview" />
        {files && files.length !== 0 && (
          <>
            <div className="img-preview" />
            <ButtonGroup widths={2}>
              <Button onClick={onCrop} positive icon="check" loading={loading} disabled={loading} />
              <Button onClick={() => setFiles([])} icon="close" disabled={loading} />
            </ButtonGroup>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default ImageUploadWidget;
