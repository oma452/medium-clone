<!DOCTYPE html>
<html>
<head>
    <title>Test Upload</title>
</head>
<body>
    <h1>Test File Upload</h1>
    
    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif
    
    @if($errors->any())
        <div style="color: red;">
            @foreach($errors->all() as $error)
                <p>{{ $error }}</p>
            @endforeach
        </div>
    @endif
    
    <form action="/test-upload" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="file" name="test_file" required>
        <button type="submit">Upload Test File</button>
    </form>
</body>
</html>