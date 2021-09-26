const { CommonHelper } = require('../commonHelper');
const { expect } = require('chai')

describe('test isValidWebhook', async () => {
  // An example of a yojee webhook payload for `dropoff` `task.completed`

  it('will return true with valid yojee-signature and valid yojee-request-timestamp', async () => {
    // The webhook secret generated for each webhook subscribed with Yojee
    const webhookSecret = 'YVAJHZ4GQ7EH5X36O55EAYGJZUYFBPAA';

    // `timestamp` and `signature` are values in the headers of the request
    const timestamp = '1632622030';
    const signature = '0b304f2348773756a2e7a61f0f746912cbcb8b3bc904ab424b05881e16776901';

    const payloadJson = {
      "company_slug": "sample_slug",
      "created_at": 1632622027,
      "data": {
        "driver": { "id": 22382, "name": "driver 1" },
        "eta": "2021-12-03T02:58:31.967000",
        "event_time": "2021-09-26T02:07:17.453000Z",
        "id": 9286129,
        "inserted_at": "2021-09-26T02:06:22.671182Z",
        "order": {
          "external_id": "EXT-2021-W1UCFAZA",
          "number": "O-XGHZDW3RN53L"
        },
        "order_item": {
          "external_customer_id": "REF-2021-W1UCFAZA",
          "external_customer_id2": "",
          "external_customer_id3": "",
          "state": "completed",
          "tracking_number": "YOJ-2NXWQZFGPOPQ"
        },
        "order_item_step": { "metadata": { "sequence": "2" } },
        "pod_url": "https://umbrella-dev.yojee.com/api/v3/public/pods/order_item/YOJ-2NXWQZFGPOPQ",
        "reasons": [],
        "sender": { "id": 2031 },
        "step_sequence": 2,
        "task_type": "dropoff"
      },
      "event_type": "task.completed",
      "id": "46ea3f4e-8589-415a-8a50-42e9b6b0cfc1",
      "webhook_id": 251,
      "yojee_instance": "https://umbrella-dev.yojee.com"
    };

    const payload = JSON.stringify(payloadJson);
    const request = {
      headers: {
        'yojee-signature': signature,
        'yojee-request-timestamp': timestamp,
      },
      body: payload
    }
    expect(CommonHelper.isValidWebhook(request, webhookSecret)).to.be.true;
  });


});