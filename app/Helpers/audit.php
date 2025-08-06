<?php

use App\Models\AuditTrail;

if (! function_exists('audit')) {
    /**
     * Record an audit trail entry.
     *
     * @param string $action  e.g. "created", "updated", "deleted"
     * @param string $module  e.g. "Incident", "Document"
     * @param string|null $details Optional description
     */
    function audit($action, $module, $details = null) {
        AuditTrail::create([
            'user_id' => auth()->id(),
            'action'  => $action,
            'module'  => $module,
            'details' => $details,
        ]);
    }
}
