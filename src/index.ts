import axios from "axios";

class FiveM_GET {
    private ip: string;
    private port: number;

    /**
     * Configuration for HTTP requests
     * @param config - The configuration for the HTTP request (IP, Port)
     */
    constructor(config: { ip: string, port: number }) {
        this.ip = config.ip;
        this.port = config.port;

        if(!this.ip || !this.port) {
            throw new Error("Please provide a valid IP and Port");
        }

        this.checkConnection().then(() => {
            console.log(`Connected to ${this.getServerAdress()}`);
        }).catch(() => {
            console.log(`Could not connect to ${this.getServerAdress()}`);
        });
    }

    /**
     * Check if the server is online and HTTP connection is open.
     * @returns if the server connection is open or not.
     * @throws Error - If the server is not online or the connection is not open.
     */
    private checkConnection() {
        return axios.get(`http://${this.getServerAdress()}/`);
    }

    /**
     * Get the current server IP
     * @returns string - The IP of the server
     */
    private getIP(): string {
        return this.ip;
    }

    /**
     * Get the current server port
     * @returns number - The port of the server
     */
    private getPort(): number {
        return this.port;
    }

    /**
     * Get the object inside the dynamic endpoint.
     * @returns object - Dynamic.json data endpoint.
     */
    private async getDynamicEndpoint(): Promise<any> {
        const response = await axios.get(`http://${this.getServerAdress()}/dynamic.json`);
        return response.data;
    }

    /**
     * Get the object inside the info endpoint.
     * @returns object - Info.json data endpoint.
     */
    private async getInfoEndpoint(): Promise<any> {
        const response = await axios.get(`http://${this.getServerAdress()}/info.json`);
        return response.data;
    }

    /**
     * Get the object inside the players endpoint.
     * @returns object - Players.json data endpoint.
     */
    private async getPlayersEndpoint(): Promise<any> {
        const response = await axios.get(`http://${this.getServerAdress()}/players.json`);
        return response.data;
    }

    /**
     * Get the current server adress
     * @returns string - The IP including the PORT
     */
    public getServerAdress(): string {
        return `${this.getIP()}:${this.getPort()}`;
    }

    /**
     * Get the current connected players.
     * @returns Promise<object> - The players connected to the server
     */
    public async getPlayers(): Promise<object> {
        return await this.getPlayersEndpoint().then(data => data);
    }

    /**
     * Get the current player count.
     * @returns Promise<number> - Amount of players connected to the server
     */
    public async getPlayerCount(): Promise<number> {
        return await this.getDynamicEndpoint().then(data => data.clients);
    }

    /**
     * Get the max players of the server.
     * @returns Promise<number> - The max players of the server
     */
    public async getMaxPlayers(): Promise<number> {
        return await this.getDynamicEndpoint().then(data => data.sv_maxclients);
    }

    /**
     * Get the current server name.
     * @returns Promise<string> - The current server name
     */
    public async getServerName(): Promise<string> {
        return await this.getDynamicEndpoint().then(data => data.hostname);
    }

    /**
     * Get the current server map name.
     * @returns Promise<string> - The current server map name
     */
    public async getServerMapName(): Promise<string> {
        return await this.getDynamicEndpoint().then(data => data.mapname);
    }

    /**
     * Get if the server has OneSync enabled.
     * @returns Promise<boolean> - If OneSync is enabled or not
     */
    public async getOneSync(): Promise<boolean> {
        return await this.getInfoEndpoint().then(data => data.vars.onesync_enabled);
    }

    /**
     * Get the servers Discord
     * @returns Promise<string> - The servers Discord
     */
    public async getDiscord(): Promise<string> {
        return await this.getInfoEndpoint().then(data => data.vars.discord);
    }
}