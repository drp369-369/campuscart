const http = require('http');

const BASE_URL = 'http://localhost:5000/api';

const makeRequest = (url, options = {}, body = null) => {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, text: data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('====================================================');
  console.log('   CAMPUSCART PHASE 1 AUTOMATED API VERIFICATION    ');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  const assert = (condition, testName, details = '') => {
    total++;
    if (condition) {
      console.log(`[PASS] [${total}] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] [${total}] ${testName} - ${details}`);
    }
  };

  try {
    // 1. Health check
    const health = await makeRequest(`${BASE_URL}/health`);
    assert(health.status === 200 && health.data.status === 'online', 'Server Health Check Endpoint');

    // 2. User Registration
    const testEmail = `student_${Date.now()}@rvu.edu.in`;
    const regPayload = {
      name: 'Test Student',
      email: testEmail,
      password: 'password123',
      confirmPassword: 'password123',
      campus: 'RV University, Bengaluru',
    };
    const regRes = await makeRequest(`${BASE_URL}/auth/register`, { method: 'POST' }, regPayload);
    assert(regRes.status === 201 && regRes.data.success && regRes.data.data.token, 'Student Registration API');
    const token = regRes.data?.data?.token;

    // 3. User Login
    const loginRes = await makeRequest(
      `${BASE_URL}/auth/login`,
      { method: 'POST' },
      { email: testEmail, password: 'password123' }
    );
    assert(loginRes.status === 200 && loginRes.data.success && loginRes.data.data.token, 'Student Login API');

    // 4. Auth Me
    const meRes = await makeRequest(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert(meRes.status === 200 && meRes.data.data.email === testEmail.toLowerCase(), 'Get Current User Profile (/api/auth/me)');

    // 5. Unauthenticated rejection
    const unauthRes = await makeRequest(`${BASE_URL}/auth/me`);
    assert(unauthRes.status === 401, 'Unauthenticated Protected Route Rejection');

    // 6. Get all listings
    const productsRes = await makeRequest(`${BASE_URL}/products`);
    assert(productsRes.status === 200 && productsRes.data.data.length >= 12, 'Get All Listings (Seeded Data Persistence)');

    // 7. Search by keyword
    const searchRes = await makeRequest(`${BASE_URL}/products?search=calculator`);
    assert(
      searchRes.status === 200 &&
      searchRes.data.data.length > 0 &&
      searchRes.data.data.every((p) => /calculator/i.test(p.title)),
      'Product Search by Keyword (case-insensitive)'
    );

    // 8. Filter by Category
    const categoryRes = await makeRequest(`${BASE_URL}/products?category=Electronics`);
    assert(
      categoryRes.status === 200 &&
      categoryRes.data.data.length > 0 &&
      categoryRes.data.data.every((p) => p.category === 'Electronics'),
      'Product Category Filter (/api/products?category=Electronics)'
    );

    // 9. Combined Search and Category
    const combinedRes = await makeRequest(`${BASE_URL}/products?search=kit&category=Electronics`);
    assert(
      combinedRes.status === 200 &&
      combinedRes.data.data.length > 0 &&
      combinedRes.data.data.every((p) => p.category === 'Electronics' && /kit/i.test(p.title)),
      'Combined Search + Category Filter (/api/products?search=kit&category=Electronics)'
    );

    // 10. Create Product Listing
    const newProductPayload = {
      title: 'Lab Oscilloscope Probe Cable Set',
      description: 'Standard 100MHz oscilloscope BNC probe cables with attenuation switch.',
      price: 650,
      category: 'Lab Equipment',
      condition: 'Like New',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
      campus: 'RV University, Bengaluru',
    };
    const createRes = await makeRequest(
      `${BASE_URL}/products`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      },
      newProductPayload
    );
    assert(createRes.status === 201 && createRes.data.success && createRes.data.data._id, 'Create Product Listing API');
    const createdProductId = createRes.data?.data?._id;

    // 11. Get Single Product
    const singleRes = await makeRequest(`${BASE_URL}/products/${createdProductId}`);
    assert(
      singleRes.status === 200 && singleRes.data.data.title === newProductPayload.title,
      'Get Single Product Details by ID'
    );

    // 12. Update Product Listing (Owner)
    const updateRes = await makeRequest(
      `${BASE_URL}/products/${createdProductId}`,
      {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      },
      { price: 599, condition: 'Good' }
    );
    assert(
      updateRes.status === 200 && updateRes.data.data.price === 599,
      'Update Product Listing (Owner Verification)'
    );

    // 13. Delete Product Listing (Owner)
    const deleteRes = await makeRequest(`${BASE_URL}/products/${createdProductId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    assert(deleteRes.status === 200 && deleteRes.data.success, 'Delete Product Listing (Owner Verification)');

    // 14. Verify deletion
    const verifyDelete = await makeRequest(`${BASE_URL}/products/${createdProductId}`);
    assert(verifyDelete.status === 404, 'Verify Deleted Product Returns 404');

    console.log(`\n====================================================`);
    console.log(`   TEST RESULTS: ${passed}/${total} TESTS PASSED    `);
    console.log(`====================================================\n`);

    if (passed === total) {
      console.log('All Phase 1 backend and database APIs verified successfully!');
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exit(1);
  }
};

runTests();
