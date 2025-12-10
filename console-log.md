 GET /api/jobs 200 in 482ms (compile: 7ms, render: 474ms)
 GET /api/jobs?stats=true 200 in 670ms (compile: 5ms, render: 666ms)
 PUT /api/jobs/7 404 in 1411ms (compile: 1099ms, render: 313ms)


AdminPageClient.tsx:687 Error updating job closed status: Error: Failed to update job closed status
    at AdminPageClient.useCallback[toggleJobClosed] (AdminPageClient.tsx:681:15)
AdminPageClient.useCallback[toggleJobClosed]	@	AdminPageClient.tsx:687
await in AdminPageClient.useCallback[toggleJobClosed]		
onClick	@	AdminPageClient.tsx:1017
<button>		
_c	@	button.tsx:46
<Button>		
(anonymous)	@	AdminPageClient.tsx:1014
AdminPageClient	@	AdminPageClient.tsx:927
"use client"		
AdminPage	@	page.tsx:32
<AdminPage>		
Function.all	@	VM1766 <anonymous>:1
Function.all	@	VM1766 <anonymous>:1
