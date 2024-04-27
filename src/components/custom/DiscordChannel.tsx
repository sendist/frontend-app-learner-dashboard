import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import WidgetBot from '@widgetbot/react-embed'

const DiscordChannel = () => {
    const { channelName } = useParams();
    const location = useLocation();
    const { channel_id, server_id } = location.state; // state harus sudah di-passing melalui Link

    return (
        <div>
            {/* <h1>Channel: {decodeURIComponent(channelName)}</h1>
            <p>Channel ID: {channel_id}</p>
            <p>Server ID: {server_id}</p> */}
            <WidgetBot
                server={server_id}
                channel={channel_id}
                style={{ width: "100%", height: "75vh" }}
            />
        </div>
    );
}

export default DiscordChannel;
