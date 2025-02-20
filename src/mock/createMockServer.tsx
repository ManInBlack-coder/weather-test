import { createServer, Server } from 'miragejs';
import searchResult from '../mock/search_result.json';
import weather from '../mock/weather.json'

let server: Server | null = null;

const createMockServer = () => {
  if (server) {
    server.shutdown(); // Ensure any existing server is stopped before creating a new one
  }

  server = createServer({
    routes() {
      this.urlPrefix = 'http://api.openweathermap.org';
      this.get('/geo/1.0/direct', () => {
        return searchResult;
      });

      this.get(