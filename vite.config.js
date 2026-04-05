import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import https from 'https'

function devApiPlugin(env) {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/create-payment-intent', (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405).end();
          return;
        }
        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', () => {
          const { amount, currency = 'gbp' } = JSON.parse(body || '{}');
          const secretKey = env.STRIPE_SECRET_KEY;
          const postData = new URLSearchParams({
            amount: String(Math.round(amount)),
            currency,
            'payment_method_types[0]': 'card',
          }).toString();

          const options = {
            hostname: 'api.stripe.com',
            path: '/v1/payment_intents',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${secretKey}`,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(postData),
            },
          };

          const stripeReq = https.request(options, (stripeRes) => {
            let data = '';
            stripeRes.on('data', (chunk) => { data += chunk; });
            stripeRes.on('end', () => {
              const json = JSON.parse(data);
              res.writeHead(stripeRes.statusCode, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(
                json.client_secret
                  ? { clientSecret: json.client_secret }
                  : { error: json.error?.message }
              ));
            });
          });

          stripeReq.on('error', (e) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
          });

          stripeReq.write(postData);
          stripeReq.end();
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), devApiPlugin(env)],
  };
})
