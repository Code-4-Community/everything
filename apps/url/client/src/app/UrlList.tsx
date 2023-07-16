import { Button, Link, ListItem, UnorderedList } from '@chakra-ui/react';
import { Shortened } from './types';
import { useState } from 'react';
import QRCodeCanvas from 'qrcode.react';

type UrlListProps = {
  urls: Array<Shortened>;
  data: string;
};

export const UrlList: React.FC<UrlListProps> = ({ urls, data }) => {
  const [text, setText] = useState('');
  const [showQrMap, setShowQrMap] = useState<Map<string, boolean>>(new Map());

  // set the selected QR codes to show, leave the rest as false
  const handleGenerateQr: React.MouseEventHandler<HTMLButtonElement> = (
    e: any
  ) => {
    const { data } = e.currentTarget.dataset as UrlListProps;
    setText(data);
    const newMap = new Map(showQrMap);
    const showQr = showQrMap.get(data);

    if (showQrMap.has(data)) {
      newMap.set(data, !showQr);
    } else {
      newMap.set(data, true);
    }

    setShowQrMap(newMap);
  };

  return (
    <UnorderedList id="urlList" textAlign="left">
      {urls.map((u) => (
        <>
          <ListItem key={u.original}>
            <Link href={u.short} color="teal.500">
              {u.short}
            </Link>{' '}
            - {u.original}
          </ListItem>
          <Button
            data-data={u.original}
            id="qr-code-btn"
            type="button"
            colorScheme="orange"
            size="sm"
            onClick={handleGenerateQr}
          >
            {showQrMap.get(u.original) ? 'Hide QR' : 'Show QR'}
          </Button>
          {showQrMap.get(u.original) ? <QRCodeCanvas value={text} /> : <></>}
        </>
      ))}
    </UnorderedList>
  );
};

export default UrlList;
