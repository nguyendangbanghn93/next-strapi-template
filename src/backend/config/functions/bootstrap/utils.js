const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

async function isFirstRun() {
    const pluginStore = strapi.store({
        environment: strapi.config.environment,
        type: "type",
        name: "setup",
    });
    const initHasRun = await pluginStore.get({ key: "initHasRun" });
    await pluginStore.set({ key: "initHasRun", value: true });
    return !initHasRun;
}

async function setPublicPermissions(newPermissions) {
    // Find the ID of the public role
    const publicRole = await strapi
        .query("role", "users-permissions")
        .findOne({ type: "public" });

    // List all available permissions
    const publicPermissions = await strapi
        .query("permission", "users-permissions")
        .find({
            type: ["users-permissions", "application"],
            role: publicRole.id,
        });

    // Update permission to match new config
    const controllersToUpdate = Object.keys(newPermissions);
    const updatePromises = publicPermissions
        .filter((permission) => {
            // Only update permissions included in newConfig
            if (!controllersToUpdate.includes(permission.controller)) {
                return false;
            }
            if (!newPermissions[permission.controller].includes(permission.action)) {
                return false;
            }
            return true;
        })
        .map((permission) => {
            // Enable the selected permissions
            return strapi
                .query("permission", "users-permissions")
                .update({ id: permission.id }, { enabled: true })
        });
    await Promise.all(updatePromises);
}

function getFileSizeInBytes(filePath) {
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
}

function getFileData(fileName) {
    const filePath = `./data/uploads/${fileName}`;

    // Parse the file metadata
    const size = getFileSizeInBytes(filePath);
    const ext = fileName.split(".").pop();
    const mimeType = mime.lookup(ext);

    return {
        path: filePath,
        name: fileName,
        size,
        type: mimeType,
    }
}

// Create an entry and attach files if there are any
async function createEntry({ model, entry, files }) {
    try {
        const createdEntry = await strapi.query(model).create(entry);
        if (files) {
            await strapi.entityService.uploadFiles(createdEntry, files, {
                model,
            });
        }
    } catch (e) {
        console.log('model', entry, e);
    }
}

module.exports = {
    isFirstRun,
    setPublicPermissions,
    getFileSizeInBytes,
    getFileData,
    createEntry
}