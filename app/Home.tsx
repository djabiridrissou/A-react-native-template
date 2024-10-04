import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import { CameraType, useCameraPermissions, CameraView } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraVisible, setCameraVisible] = useState(false);
    const [cameraRef, setCameraRef] = useState<typeof CameraView | null>(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    async function handleCapture() {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            const fileUri = `${FileSystem.documentDirectory}${new Date().getTime()}.jpg`;
            await FileSystem.moveAsync({
                from: photo.uri,
                to: fileUri,
            });
            Alert.alert('Capture', `Image saved to: ${fileUri}`);
        }
    }

    function closeCamera() {
        setCameraVisible(false);
    }

    return (
        <View style={styles.container}>
            {!isCameraVisible ? (
                <TouchableOpacity style={styles.openCameraButton} onPress={() => setCameraVisible(true)}>
                    <Text style={styles.openCameraButtonText}>Open Camera</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.cameraContainer}>
                    <CameraView style={styles.camera} facing={facing} ref={(ref: any) => setCameraRef(ref)}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.iconButton} onPress={handleCapture}>
                                <Icon name="camera" size={30} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton} onPress={closeCamera}>
                                <Icon name="close" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
    },
    openCameraButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 4,
    },
    openCameraButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    iconButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 50,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 20,
    },
});
