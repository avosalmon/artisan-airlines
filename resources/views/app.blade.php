<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        @routes
        @viteReactRefresh
        @if(str_contains($page['component'], '::'))
            @php
                [$module, $path] = explode('::', $page['component']);
            @endphp
            @vite(['resources/js/app.tsx', "app-modules/{$module}/resources/js/pages/{$path}.tsx"])
        @else
            @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @endif
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
