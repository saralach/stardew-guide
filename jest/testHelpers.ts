// ============================== getMockSession() ==============================
function getMockSession() {
  return {
    user: { username: 'totallyRealUser' },
    expires: '2099-01-01T00:00:00.000Z'
  };
};


// =========================== getMockErrorResponse() ===========================
function getMockErrorResponse(): Promise<Response> {
  return Promise.resolve({
    ok: false,
    status: 500,
    json: () => Promise.resolve({ error: 'Failed to fetch documents' })
  } as unknown as Response );
};


// =========================== getMockReqsResponse() ============================
// Gets a sample set of requirement data.
function getMockReqsResponse(): Promise<Response> {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([
      {
        subcategory: 'Minerals',
        subcategory_id: 1,
        reqs: [ 
          { req_id: 'Quartz' }, 
          { req_id: 'Earth Crystal' }, 
          { req_id: 'Frozen Tear' }
        ]
      },
      {
        subcategory: 'Artifacts',
        subcategory_id: 2,
        reqs: [
          { req_id: 'Dwarf Scroll IV' },
          { req_id: 'Arrowhead' },
          { req_id: 'Ancient Doll' }
        ]
      }
    ])
  } as unknown as Response );
};


// ============================ getMockChkResponse() ============================
function getMockChkResponse(isEmpty: boolean): Promise<Response> {
  const userChkData = isEmpty ? [] : [
    { subcategory: 'Minerals', checkbox_id: 'Quartz' },
    { subcategory: 'Minerals', checkbox_id: 'Frozen Tear' },
    { subcategory: 'Minerals', checkbox_id: 'Arrowhead' },
    { subcategory: 'Minerals', checkbox_id: 'Ancient Doll' }
  ];
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(userChkData)
  } as unknown as Response );
};



export { getMockSession, getMockErrorResponse, getMockReqsResponse, getMockChkResponse };